-- CreateTable
CREATE TABLE "Stargates" (
    "id" TEXT NOT NULL,
    "gate_address" TEXT NOT NULL,
    "gate_code" TEXT NOT NULL,
    "gate_status" TEXT NOT NULL DEFAULT 'IDLE',
    "public_gate" BOOLEAN NOT NULL,
    "owner_name" TEXT NOT NULL,
    "session_url" TEXT NOT NULL,
    "session_name" TEXT NOT NULL,
    "active_users" INTEGER NOT NULL,
    "max_users" INTEGER NOT NULL,
    "iris_state" BOOLEAN NOT NULL,

    CONSTRAINT "Stargates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannedUsers" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,

    CONSTRAINT "BannedUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stargates_gate_address_key" ON "Stargates"("gate_address");

-- CreateIndex
CREATE UNIQUE INDEX "BannedUsers_user_id_key" ON "BannedUsers"("user_id");
