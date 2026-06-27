"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

export default function ApplicationActions({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<"approve" | "reject" | null>(null);
  const [error, setError] = useState("");
  const [rejectOpen, setRejectOpen] = useState(false);
  const [reason, setReason] = useState("");

  async function approve() {
    setBusy("approve");
    setError("");
    const res = await fetch(`/api/admin/applications/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "approve" }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      router.refresh();
    } else {
      setError(data.error ?? "Could not approve.");
    }
    setBusy(null);
  }

  async function reject() {
    setBusy("reject");
    setError("");
    const res = await fetch(`/api/admin/applications/${applicationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "reject",
        rejection_reason: reason || null,
      }),
    });
    const data = await res.json();
    if (res.ok && data.ok) {
      setRejectOpen(false);
      router.refresh();
    } else {
      setError(data.error ?? "Could not reject.");
    }
    setBusy(null);
  }

  return (
    <>
      {error && (
        <p className="mb-4 font-satoshi text-sm text-[#C97A7A]">{error}</p>
      )}
      <div className="flex gap-3">
        <button
          onClick={approve}
          disabled={busy !== null}
          className="bg-brass text-ink px-6 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-brass-bright transition-colors disabled:opacity-50"
        >
          {busy === "approve" ? "Approving…" : "Approve"}
        </button>
        <button
          onClick={() => setRejectOpen(true)}
          disabled={busy !== null}
          className="border border-[#8B3A3A] text-[#C97A7A] px-6 py-3 font-satoshi text-xs tracking-[0.2em] uppercase hover:bg-[#8B3A3A] hover:text-ivory transition-colors disabled:opacity-50"
        >
          Reject
        </button>
      </div>

      <Modal
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        title="Reject application"
        footer={
          <>
            <button
              onClick={() => setRejectOpen(false)}
              className="font-satoshi text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-brass"
            >
              Cancel
            </button>
            <button
              onClick={reject}
              disabled={busy === "reject"}
              className="bg-[#8B3A3A] text-ivory px-6 py-2.5 font-satoshi text-xs tracking-[0.2em] uppercase hover:brightness-110 disabled:opacity-50"
            >
              Confirm rejection
            </button>
          </>
        }
      >
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional, shared privately with applicant)"
          className="w-full bg-charcoal border border-ivory/15 px-4 py-3 text-ivory font-satoshi text-sm focus:border-brass resize-none"
          rows={3}
        />
      </Modal>
    </>
  );
}
