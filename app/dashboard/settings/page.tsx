"use client";

import { useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
  membershipTier: string | null;
}

export default function SettingsPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        setUser(d.user);
        setName(d.user?.name || "");
      });
  }, []);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!user) return null;

  return (
    <div className="animate-fade-in max-w-xl">
      <h1 className="font-playfair text-3xl text-white mb-1">Settings</h1>
      <p className="font-inter text-muted-text mb-8">
        Manage your account preferences.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block font-inter text-sm text-muted-text mb-1.5">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-3 text-white font-inter focus:border-gold transition-colors"
          />
        </div>

        <div>
          <label className="block font-inter text-sm text-muted-text mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            disabled
            className="w-full bg-charcoal border border-white/10 rounded-sm px-4 py-3 text-muted-text font-inter cursor-not-allowed"
          />
          <p className="font-inter text-xs text-muted-text mt-1">
            Email cannot be changed.
          </p>
        </div>

        <div>
          <label className="block font-inter text-sm text-muted-text mb-1.5">
            Password
          </label>
          <button className="font-inter text-sm text-gold hover:text-gold-hover transition-colors">
            Change password
          </button>
        </div>

        <div className="pt-4 border-t border-white/5">
          <h3 className="font-inter text-sm text-white mb-3">Notifications</h3>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 accent-gold rounded"
            />
            <span className="font-inter text-sm text-muted-text">
              Booking confirmations
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer mt-2">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 accent-gold rounded"
            />
            <span className="font-inter text-sm text-muted-text">
              Promotional emails
            </span>
          </label>
        </div>

        <button
          onClick={handleSave}
          className="bg-gold text-rich-black font-inter font-semibold px-6 py-2.5 rounded-sm hover:bg-gold-hover transition-colors"
        >
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
