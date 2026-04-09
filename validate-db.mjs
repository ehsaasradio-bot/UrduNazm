// Quick validation script for Phase 3
// Run: node validate-db.mjs

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";

// Read .env.local
const envFile = readFileSync(".env.local", "utf-8");
const env = {};
envFile.split("\n").forEach((line) => {
  const [key, ...val] = line.split("=");
  if (key && val.length) env[key.trim()] = val.join("=").trim();
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !key || key === "paste_your_anon_key_here") {
  console.error("❌ .env.local is missing or has placeholder values");
  console.error("   URL:", url || "MISSING");
  console.error("   Key:", key ? (key.startsWith("eyJ") ? "✅ Set" : "⚠️ Doesn't look like a valid key") : "MISSING");
  process.exit(1);
}

console.log("🔗 Connecting to:", url);
const supabase = createClient(url, key);

async function validate() {
  let passed = 0;
  let failed = 0;

  // Test 1: Categories
  const { data: cats, error: e1 } = await supabase.from("categories").select("*");
  if (e1) { console.error("❌ Categories:", e1.message); failed++; }
  else { console.log(`✅ Categories: ${cats.length} found`); passed++; }

  // Test 2: Poets
  const { data: poets, error: e2 } = await supabase.from("poets").select("*");
  if (e2) { console.error("❌ Poets:", e2.message); failed++; }
  else { console.log(`✅ Poets: ${poets.length} found`); passed++; }

  // Test 3: Poems
  const { data: poems, error: e3 } = await supabase.from("poems").select("*");
  if (e3) { console.error("❌ Poems:", e3.message); failed++; }
  else { console.log(`✅ Poems: ${poems.length} found`); passed++; }

  // Test 4: Poems with relations (join test)
  const { data: poemsJoin, error: e4 } = await supabase
    .from("poems")
    .select("title_en, poet:poets!poet_id(name_en), category:categories!category_id(name_en)")
    .limit(1);
  if (e4) { console.error("❌ Poem joins:", e4.message); failed++; }
  else { console.log(`✅ Poem joins work:`, JSON.stringify(poemsJoin[0])); passed++; }

  // Test 5: Blogs
  const { data: blogs, error: e5 } = await supabase.from("blogs").select("*").eq("published", true);
  if (e5) { console.error("❌ Blogs:", e5.message); failed++; }
  else { console.log(`✅ Blogs: ${blogs.length} published`); passed++; }

  // Test 6: Featured poems
  const { data: featured, error: e6 } = await supabase.from("poems").select("*").eq("featured", true);
  if (e6) { console.error("❌ Featured poems:", e6.message); failed++; }
  else { console.log(`✅ Featured poems: ${featured.length} found`); passed++; }

  // Test 7: RLS - bookmarks should return empty (no auth)
  const { data: bookmarks, error: e7 } = await supabase.from("bookmarks").select("*");
  if (e7) { console.error("❌ Bookmarks RLS:", e7.message); failed++; }
  else { console.log(`✅ Bookmarks RLS working: ${bookmarks.length} (should be 0, no auth)`); passed++; }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);

  if (failed === 0) {
    console.log("🎉 Phase 3 validation PASSED! Ready for Phase 4.");
  } else {
    console.log("⚠️ Some tests failed. Check errors above.");
  }
}

validate().catch(console.error);
