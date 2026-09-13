-- Supabase SQL Migration script for Quiz Analytics
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

CREATE TABLE IF NOT EXISTS public.quiz_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT now(),
    client_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    data JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.quiz_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies to allow inserting and selecting analytics data
CREATE POLICY "Allow public insert to quiz_analytics" 
ON public.quiz_analytics 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public select to quiz_analytics" 
ON public.quiz_analytics 
FOR SELECT 
USING (true);
