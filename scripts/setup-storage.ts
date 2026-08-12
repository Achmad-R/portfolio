import { createClient } from "@supabase/supabase-js";
import pg from "pg";
import { storageBucket } from "../src/lib/supabase";

const supabaseUrl = process.env.SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const directUrl = process.env.DIRECT_URL!;
const BUCKET = storageBucket;

async function main() {
  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  });

  const { data: buckets, error: listError } = await admin.storage.listBuckets();
  if (listError) throw new Error(`listBuckets: ${listError.message}`);

  const exists = buckets.some((b) => b.name === BUCKET);
  if (!exists) {
    const { error } = await admin.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"],
    });
    if (error) throw new Error(`createBucket: ${error.message}`);
    console.log(`Bucket "${BUCKET}" dibuat (public).`);
  } else {
    console.log(`Bucket "${BUCKET}" sudah ada.`);
  }

  const client = new pg.Client({ connectionString: directUrl });
  await client.connect();

  const { rows } = await client.query(
    `select 1 from pg_policies
     where schemaname = 'storage' and tablename = 'objects'
       and policyname = 'Public ${BUCKET} read'`
  );

  if (rows.length === 0) {
    await client.query(
      `create policy "Public ${BUCKET} read"
       on storage.objects for select
       using (bucket_id = '${BUCKET}')`
    );
    console.log("Policy public-read dibuat.");
  } else {
    console.log("Policy public-read sudah ada.");
  }

  await client.end();
  console.log("Storage setup selesai.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});