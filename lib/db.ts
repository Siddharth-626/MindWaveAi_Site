import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export async function insertContact(data: {
  name: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  budget?: string;
  message: string;
  source: string;
  tags: string[];
}) {
  const { data: result, error } = await supabase
    .from("contacts")
    .insert([
      {
        ...data,
        status: "new",
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return result;
}

export async function getBlogPosts(options?: {
  limit?: number;
  offset?: number;
  category?: string;
}) {
  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (options?.category) {
    query = query.eq("category", options.category);
  }
  if (options?.limit) {
    query = query.limit(options.limit);
  }
  if (options?.offset) {
    query = query.range(
      options.offset,
      options.offset + (options.limit || 10) - 1
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) throw error;
  return data;
}
