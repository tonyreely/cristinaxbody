-- Create payments table to track Stripe transactions
CREATE TABLE public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  stripe_session_id text NOT NULL UNIQUE,
  paid boolean DEFAULT false,
  paid_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Only service role can read/write payments
CREATE POLICY "Service role can manage payments"
ON public.payments
FOR ALL
USING (false)
WITH CHECK (false);

-- Add sheet_row_id to leads table for tracking synced rows
ALTER TABLE public.leads ADD COLUMN sheet_row_id text;