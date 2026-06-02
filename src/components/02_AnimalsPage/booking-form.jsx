"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TextureButton } from "@/components/ui/texture-button";
import {
  TextureCardContent,
  TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "@/components/ui/texture-card";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const BookingForm = ({ animal }) => {
  const session = useSession?.();
  const user = session?.user || null;

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to place a booking.");
      return;
    }
    setSubmitting(true);
    try {
      // Simulate booking process; requirement says do not persist.
      await new Promise((r) => setTimeout(r, 700));
      toast.success("Booking submitted successfully!");
      setForm({ name: user?.name || "", email: user?.email || "", phone: "", address: "" });
    } catch (err) {
      toast.error("Failed to submit booking. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Toaster />
      <TextureCardStyled>
        <TextureCardHeader className="p-4">
          <TextureCardTitle>Book this animal</TextureCardTitle>
        </TextureCardHeader>
        <TextureSeparator />
        <TextureCardContent>
          {!user && (
            <div className="mb-4 text-sm">
              You need to <Link href="/auth/signin" className="text-primary">sign in</Link> to book.
            </div>
          )}
          <form id="booking" onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" name="address" value={form.address} onChange={handleChange} required />
            </div>
          </form>
        </TextureCardContent>
        <TextureSeparator />
        <TextureCardFooter className="p-4">
          <TextureButton type="submit" form="booking" variant="accent" disabled={submitting}>
            {submitting ? "Submitting..." : `Book ${animal?.name || "animal"}`}
          </TextureButton>
        </TextureCardFooter>
      </TextureCardStyled>
    </div>
  );
};

export default BookingForm;
