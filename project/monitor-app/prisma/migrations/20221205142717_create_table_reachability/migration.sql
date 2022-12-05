-- CreateTable
CREATE TABLE "Reachability" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "transmitted" INTEGER NOT NULL,
    "received" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hostId" INTEGER NOT NULL,
    CONSTRAINT "Reachability_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);