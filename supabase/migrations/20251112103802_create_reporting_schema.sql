/*
  # Reporting Application Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `full_name` (text)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
    
    - `report_definitions`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `description` (text)
      - `category` (text, not null)
      - `api_endpoint` (text, not null)
      - `supports_excel_export` (boolean, default true)
      - `supports_pdf_export` (boolean, default false)
      - `filter_config` (jsonb) - stores filter configuration
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
    
    - `user_report_access`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `report_id` (uuid, references report_definitions)
      - `granted_at` (timestamp with timezone)
      - Unique constraint on (user_id, report_id)

  2. Security
    - Enable RLS on all tables
    - Users can only view their own profile
    - Users can only view reports they have access to
    - Report definitions are read-only for authenticated users
*/

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create report_definitions table
CREATE TABLE IF NOT EXISTS report_definitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'General',
  api_endpoint text NOT NULL,
  supports_excel_export boolean DEFAULT true,
  supports_pdf_export boolean DEFAULT false,
  filter_config jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE report_definitions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view report definitions"
  ON report_definitions FOR SELECT
  TO authenticated
  USING (true);

-- Create user_report_access table
CREATE TABLE IF NOT EXISTS user_report_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  report_id uuid NOT NULL REFERENCES report_definitions(id) ON DELETE CASCADE,
  granted_at timestamptz DEFAULT now(),
  UNIQUE(user_id, report_id)
);

ALTER TABLE user_report_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own report access"
  ON user_report_access FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_report_access_user_id ON user_report_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_report_access_report_id ON user_report_access(report_id);
CREATE INDEX IF NOT EXISTS idx_report_definitions_category ON report_definitions(category);

-- Insert sample report definitions
INSERT INTO report_definitions (name, description, category, api_endpoint, supports_excel_export, supports_pdf_export, filter_config)
VALUES
  ('Sales Performance Report', 'Comprehensive sales metrics and performance tracking', 'Sales', '/api/reports/sales-performance', true, true, '{"filters": [{"type": "daterange", "name": "period"}, {"type": "select", "name": "region"}]}'),
  ('Revenue Analytics', 'Detailed revenue breakdown and analysis', 'Finance', '/api/reports/revenue-analytics', true, true, '{"filters": [{"type": "daterange", "name": "period"}, {"type": "select", "name": "department"}]}'),
  ('Employee Productivity', 'Track employee performance and productivity metrics', 'HR', '/api/reports/employee-productivity', true, false, '{"filters": [{"type": "select", "name": "department"}, {"type": "text", "name": "employee_id"}]}'),
  ('Inventory Status', 'Current inventory levels and stock tracking', 'Operations', '/api/reports/inventory-status', true, false, '{"filters": [{"type": "select", "name": "warehouse"}, {"type": "select", "name": "category"}]}'),
  ('Customer Satisfaction', 'Customer feedback and satisfaction scores', 'Customer Service', '/api/reports/customer-satisfaction', true, true, '{"filters": [{"type": "daterange", "name": "period"}, {"type": "select", "name": "product"}]}'),
  ('Marketing Campaign Performance', 'Marketing campaign metrics and ROI', 'Marketing', '/api/reports/marketing-campaigns', true, false, '{"filters": [{"type": "daterange", "name": "period"}, {"type": "select", "name": "channel"}]}'),
  ('Expense Report', 'Company expenses and budget tracking', 'Finance', '/api/reports/expenses', true, true, '{"filters": [{"type": "daterange", "name": "period"}, {"type": "select", "name": "category"}]}'),
  ('Project Timeline', 'Project progress and milestone tracking', 'Operations', '/api/reports/project-timeline', true, false, '{"filters": [{"type": "select", "name": "project"}, {"type": "select", "name": "status"}]}')
ON CONFLICT DO NOTHING;
