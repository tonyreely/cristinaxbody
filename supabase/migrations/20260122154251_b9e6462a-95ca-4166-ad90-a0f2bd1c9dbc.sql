-- Drop the existing problematic policy
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;

-- Recreate with explicit PERMISSIVE access for anonymous inserts
CREATE POLICY "Anyone can insert leads" 
ON public.leads 
AS PERMISSIVE
FOR INSERT 
TO public
WITH CHECK (true);