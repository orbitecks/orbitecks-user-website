import { createClient } from '@supabase/supabase-js';
import { sanitizeInput } from './textHelper';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials are missing. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your env settings.'
  );
}

const client = createClient(supabaseUrl, supabaseAnonKey);

const originalFrom = client.from.bind(client);

// Wrap the client.from method to automatically sanitize write payloads
client.from = (relation: string) => {
  const builder = originalFrom(relation);

  const originalInsert = builder.insert.bind(builder);
  builder.insert = (values: any, options?: any) => {
    return originalInsert(sanitizeInput(values), options);
  };

  const originalUpdate = builder.update.bind(builder);
  builder.update = (values: any, options?: any) => {
    return originalUpdate(sanitizeInput(values), options);
  };

  const originalUpsert = builder.upsert.bind(builder);
  builder.upsert = (values: any, options?: any) => {
    return originalUpsert(sanitizeInput(values), options);
  };

  return builder;
};

export const supabase = client;
