-- =========================================================
-- DATABASE CREATION & SCHEMA FOR LIZSTOCK VVIP SIGNAL RECAP
-- Compatible with PostgreSQL & MySQL (Adjust syntax where noted)
-- =========================================================

-- 1. Table Structure for Admins
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table Structure for Signals
CREATE TABLE IF NOT EXISTS signals (
    id SERIAL PRIMARY KEY,
    tanggal DATE NOT NULL,
    emiten VARCHAR(10) NOT NULL,
    strategi VARCHAR(20) NOT NULL, -- Swing, Scalping, BPJS, BSJP
    status VARCHAR(10) NOT NULL DEFAULT 'OPEN', -- OPEN, HOLD, TP, SL
    area_beli VARCHAR(50) NOT NULL,
    harga_terbaru NUMERIC(12, 2) NOT NULL,
    area_tp VARCHAR(50),
    floating_tp NUMERIC(5, 2) DEFAULT 0,
    gain_loss NUMERIC(5, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Indexes for Faster Querying
CREATE INDEX IF NOT EXISTS idx_signals_tanggal ON signals(tanggal DESC);
CREATE INDEX IF NOT EXISTS idx_signals_emiten ON signals(emiten);
CREATE INDEX IF NOT EXISTS idx_signals_status ON signals(status);

-- 4. Initial Seed Data (Default Admin & Dummy Stock Signals)
-- Default PIN Admin: admin123 / 1234
INSERT IGNORE INTO admins (username, password_hash) 
VALUES ('admin', '$2b$10$e.4v2iT2EOn/9.z2dJ53O.d1LdK4JpD3O6JdM3h3fG4y4y4y4y4y4');

INSERT INTO signals (tanggal, emiten, strategi, status, area_beli, harga_terbaru, area_tp, floating_tp, gain_loss) VALUES
('2026-08-05', 'BBCA', 'Swing', 'TP', '10250 - 10350', 10800.00, '10700 / 11000', 4.85, 4.85),
('2026-08-05', 'ADRO', 'Scalping', 'TP', '3600 - 3640', 3750.00, '3720 / 3800', 3.55, 3.55),
('2026-08-05', 'BRIS', 'BPJS', 'SL', '2900 - 2950', 2810.00, '3050 - 3100', -3.10, -3.10),
('2026-08-04', 'TLKM', 'Swing', 'HOLD', '2800 - 2850', 2870.00, '2980 / 3100', 1.41, 1.41),
('2026-08-04', 'AMMN', 'BSJP', 'TP', '11500 - 11650', 12200.00, '12000 / 12500', 5.17, 5.17);