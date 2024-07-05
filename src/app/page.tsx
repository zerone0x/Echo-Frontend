"use client";
import React, { useState } from "react";
import { Metadata } from "next";
import SignUpForm from "@/app/_components/SignUpForm";
import LoginForm from "@/app/_components/LoginForm";
import Link from "next/link";
import Welcome from "./_components/Welcome";

export default async function App() {
  return <Welcome />;
}
