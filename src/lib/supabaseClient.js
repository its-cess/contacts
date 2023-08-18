import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tbqmgnutbpoiktnsufco.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRicW1nbnV0YnBvaWt0bnN1ZmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzMDYyMTMsImV4cCI6MjAwNzg4MjIxM30.lnud2ZaJjsEo3tGj_WCv6SV78uWWLlPqxQ0wxeXb-aM"
);
