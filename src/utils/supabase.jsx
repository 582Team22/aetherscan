/*
 * Author: Kyle Spragg
 * File: supabase.jsx
 * Purpose: This module initializes the Supabase client using the 
 *          Supabase URL and anonymous key from environment variables.
 */

import { createClient } from '@supabase/supabase-js'; // Importing the createClient function from Supabase library

// Retrieving the Supabase URL and anonymous key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // URL for the Supabase instance
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Anonymous key for accessing Supabase

// Creating a Supabase client instance with the provided URL and key
const supabase = createClient(supabaseUrl, supabaseKey); // Initializing the Supabase client

export default supabase; // Exporting the Supabase client for use in other parts of the application
