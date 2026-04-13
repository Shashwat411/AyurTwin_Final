-- =====================================================
-- AYURTWIN - COMPLETE SUPABASE DATABASE SCHEMA
-- Paste this SQL into Supabase SQL Editor and Run
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS TABLE (Core user accounts)
-- =====================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('patient', 'family_member')),
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    age INT,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    height_cm FLOAT,
    weight_kg FLOAT,
    bmi FLOAT,
    bmi_category VARCHAR(20),
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. LIFESTYLE DATA
-- =====================================================
CREATE TABLE lifestyle_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    physical_activity VARCHAR(20) CHECK (physical_activity IN ('low', 'moderate', 'high')),
    work_type VARCHAR(20) CHECK (work_type IN ('sitting', 'active', 'mixed')),
    diet_type VARCHAR(50),
    smoking BOOLEAN DEFAULT FALSE,
    alcohol BOOLEAN DEFAULT FALSE,
    water_intake_liters FLOAT,
    junk_food_frequency INT, -- 0-10 scale
    exercise_minutes INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. SLEEP & MENTAL HEALTH DATA
-- =====================================================
CREATE TABLE sleep_mental_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    sleep_duration_hours FLOAT,
    sleep_time TIME,
    wake_time TIME,
    daytime_sleepiness INT CHECK (daytime_sleepiness BETWEEN 0 AND 10),
    stress_level INT CHECK (stress_level BETWEEN 0 AND 10),
    anxiety_level INT CHECK (anxiety_level BETWEEN 0 AND 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. FAMILY HISTORY
-- =====================================================
CREATE TABLE family_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    diabetes BOOLEAN DEFAULT FALSE,
    heart_disease BOOLEAN DEFAULT FALSE,
    hypertension BOOLEAN DEFAULT FALSE,
    asthma BOOLEAN DEFAULT FALSE,
    arthritis BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 5. SYMPTOMS
-- =====================================================
CREATE TABLE symptoms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    frequent_thirst BOOLEAN DEFAULT FALSE,
    frequent_urination BOOLEAN DEFAULT FALSE,
    joint_pain BOOLEAN DEFAULT FALSE,
    breathing_difficulty BOOLEAN DEFAULT FALSE,
    digestive_issues BOOLEAN DEFAULT FALSE,
    fatigue_level INT CHECK (fatigue_level BETWEEN 0 AND 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. AYURVEDIC INPUTS
-- =====================================================
CREATE TABLE ayurvedic_inputs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    digestion_strength INT CHECK (digestion_strength BETWEEN 0 AND 10),
    appetite INT CHECK (appetite BETWEEN 0 AND 10),
    sweating INT CHECK (sweating BETWEEN 0 AND 10),
    body_temperature VARCHAR(20) CHECK (body_temperature IN ('cold', 'normal', 'hot')),
    stress_response VARCHAR(20) CHECK (stress_response IN ('calm', 'irritable', 'anxious')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 7. PRAKRITI QUIZ RESULTS
-- =====================================================
CREATE TABLE prakriti_quiz (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    answers JSONB NOT NULL,
    vata_score INT NOT NULL,
    pitta_score INT NOT NULL,
    kapha_score INT NOT NULL,
    vata_percent FLOAT NOT NULL,
    pitta_percent FLOAT NOT NULL,
    kapha_percent FLOAT NOT NULL,
    prakriti VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 8. HEALTH METRICS (Simulated vitals)
-- =====================================================
CREATE TABLE health_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    heart_rate INT,
    temperature FLOAT,
    spo2 FLOAT,
    stress_index INT,
    sleep_score INT,
    activity_score INT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 9. DISEASE PREDICTIONS
-- =====================================================
CREATE TABLE disease_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    diabetes_risk FLOAT,
    hypertension_risk FLOAT,
    heart_disease_risk FLOAT,
    stress_risk FLOAT,
    sleep_disorder_risk FLOAT,
    asthma_risk FLOAT,
    arthritis_risk FLOAT,
    obesity_risk FLOAT,
    digestive_disorder_risk FLOAT,
    fever_risk FLOAT,
    overall_health_score INT CHECK (overall_health_score BETWEEN 0 AND 100),
    predicted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 10. DOSHA BALANCE TRACKING
-- =====================================================
CREATE TABLE dosha_balance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    vata_level FLOAT,
    pitta_level FLOAT,
    kapha_level FLOAT,
    imbalance_detected BOOLEAN DEFAULT FALSE,
    imbalance_type VARCHAR(50),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 11. ALERTS
-- =====================================================
CREATE TABLE alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    alert_type VARCHAR(30) CHECK (alert_type IN ('critical', 'warning', 'info', 'dosha', 'risk', 'system')),
    category VARCHAR(30) CHECK (category IN ('stress', 'dosha', 'risk', 'sleep', 'vitals', 'system')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 12. RECOMMENDATIONS
-- =====================================================
CREATE TABLE recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recommendation_type VARCHAR(30) CHECK (recommendation_type IN ('diet', 'exercise', 'lifestyle', 'ayurvedic', 'medical')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    priority INT DEFAULT 1,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 13. FAMILY CONNECTIONS
-- =====================================================
CREATE TABLE family_connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES users(id) ON DELETE CASCADE,
    family_member_id UUID REFERENCES users(id) ON DELETE CASCADE,
    relationship VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(patient_id, family_member_id)
);

-- =====================================================
-- 14. LEADERBOARD
-- =====================================================
CREATE TABLE leaderboard (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    health_score INT DEFAULT 0,
    improvement_score INT DEFAULT 0,
    consistency_score INT DEFAULT 0,
    total_score INT DEFAULT 0,
    rank INT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 15. SOCIAL POSTS
-- =====================================================
CREATE TABLE social_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type VARCHAR(30) CHECK (post_type IN ('achievement', 'milestone', 'tip', 'general')),
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 16. SOCIAL LIKES
-- =====================================================
CREATE TABLE social_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- =====================================================
-- 17. SOCIAL COMMENTS
-- =====================================================
CREATE TABLE social_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES social_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 18. DINACHARYA (Daily Routine Tracking)
-- =====================================================
CREATE TABLE dinacharya_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    wake_early BOOLEAN DEFAULT FALSE,
    drink_water BOOLEAN DEFAULT FALSE,
    exercise BOOLEAN DEFAULT FALSE,
    meditation BOOLEAN DEFAULT FALSE,
    healthy_breakfast BOOLEAN DEFAULT FALSE,
    healthy_lunch BOOLEAN DEFAULT FALSE,
    healthy_dinner BOOLEAN DEFAULT FALSE,
    early_sleep BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- =====================================================
-- 19. MEAL TRACKING
-- =====================================================
CREATE TABLE meal_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    meal_type VARCHAR(20) CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
    description TEXT,
    calories INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 20. HEALTH JOURNEY (Progress tracking over time)
-- =====================================================
CREATE TABLE health_journey (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    week_number INT,
    health_score INT,
    weight FLOAT,
    bmi FLOAT,
    stress_level INT,
    sleep_quality INT,
    notes TEXT,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 21. CHATBOT CONVERSATIONS
-- =====================================================
CREATE TABLE chatbot_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sender VARCHAR(10) CHECK (sender IN ('user', 'bot')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES for performance
-- =====================================================
CREATE INDEX idx_lifestyle_user ON lifestyle_data(user_id);
CREATE INDEX idx_sleep_user ON sleep_mental_data(user_id);
CREATE INDEX idx_family_hist_user ON family_history(user_id);
CREATE INDEX idx_symptoms_user ON symptoms(user_id);
CREATE INDEX idx_ayurvedic_user ON ayurvedic_inputs(user_id);
CREATE INDEX idx_prakriti_user ON prakriti_quiz(user_id);
CREATE INDEX idx_metrics_user ON health_metrics(user_id);
CREATE INDEX idx_metrics_time ON health_metrics(recorded_at);
CREATE INDEX idx_predictions_user ON disease_predictions(user_id);
CREATE INDEX idx_dosha_user ON dosha_balance(user_id);
CREATE INDEX idx_alerts_user ON alerts(user_id);
CREATE INDEX idx_alerts_active ON alerts(is_active);
CREATE INDEX idx_recommendations_user ON recommendations(user_id);
CREATE INDEX idx_family_conn_patient ON family_connections(patient_id);
CREATE INDEX idx_family_conn_member ON family_connections(family_member_id);
CREATE INDEX idx_leaderboard_score ON leaderboard(total_score DESC);
CREATE INDEX idx_social_posts_user ON social_posts(user_id);
CREATE INDEX idx_social_posts_time ON social_posts(created_at DESC);
CREATE INDEX idx_dinacharya_user_date ON dinacharya_tracking(user_id, date);
CREATE INDEX idx_meal_user_date ON meal_tracking(user_id, date);
CREATE INDEX idx_journey_user ON health_journey(user_id);
CREATE INDEX idx_chatbot_user ON chatbot_conversations(user_id);

-- =====================================================
-- Row Level Security (RLS) Policies
-- =====================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lifestyle_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE sleep_mental_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptoms ENABLE ROW LEVEL SECURITY;
ALTER TABLE ayurvedic_inputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE prakriti_quiz ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE disease_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dosha_balance ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE dinacharya_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Allow all operations for authenticated users on their own data
-- (You can customize these policies based on your auth setup)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (true);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (true);

-- Apply same policy pattern to all tables
DO $$
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN
        SELECT unnest(ARRAY[
            'lifestyle_data', 'sleep_mental_data', 'family_history',
            'symptoms', 'ayurvedic_inputs', 'prakriti_quiz',
            'health_metrics', 'disease_predictions', 'dosha_balance',
            'alerts', 'recommendations', 'family_connections',
            'leaderboard', 'social_posts', 'social_likes',
            'social_comments', 'dinacharya_tracking', 'meal_tracking',
            'health_journey', 'chatbot_conversations'
        ])
    LOOP
        EXECUTE format('CREATE POLICY "Allow all for %s" ON %I FOR ALL USING (true) WITH CHECK (true)', tbl, tbl);
    END LOOP;
END $$;
