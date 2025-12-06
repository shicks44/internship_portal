"use client";

import React, { useMemo, useState } from "react";

type ApplicantForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telNo: string;
  fieldOfStudy: string;
  gpa: string;
  resumeUrl: string;
  gradYear: string;
  status: string;
  age: string;
};

const tabs = [
  { label: "Register Applicant" },
  { label: "Manage Applicant Skills" },
  { label: "Create Internship Posting" },
  { label: "Browse & Apply / My Applications" },
  { label: "Applications Analytics" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [skills, setSkills] = useState<string[]>(["Python", "SQL", "React"]);
  const [newSkill, setNewSkill] = useState("");
  const [posting, setPosting] = useState({
    title: "",
    location: "",
    type: "On-site",
    description: "",
    deadline: "",
  });
  const [filter, setFilter] = useState({ keyword: "", location: "", status: "All" });
  const [form, setForm] = useState<ApplicantForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    telNo: "",
    fieldOfStudy: "",
    gpa: "",
    resumeUrl: "",
    gradYear: "",
    status: "Active",
    age: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("New applicant:", form);
    alert("Demo only: applicant data logged to console.");
  }

  const tabContent = useMemo(() => {
    switch (activeTab) {
      case 0:
        return (
          <ApplicantFormSection form={form} onChange={handleChange} onSubmit={handleSubmit} setForm={setForm} />
        );
      case 1:
        return (
          <SkillsSection
            skills={skills}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            onAdd={() => {
              if (!newSkill.trim()) return;
              setSkills((prev) => Array.from(new Set([...prev, newSkill.trim()])));
              setNewSkill("");
            }}
            onRemove={(skill) => setSkills((prev) => prev.filter((s) => s !== skill))}
          />
        );
      case 2:
        return (
          <PostingSection
            posting={posting}
            setPosting={setPosting}
            onSubmit={() => alert("Posting draft saved locally (demo).")}
          />
        );
      case 3:
        return (
          <BrowseSection
            filter={filter}
            setFilter={setFilter}
            onApply={(role) => alert(`Apply (demo): ${role}`)}
          />
        );
      case 4:
        return <AnalyticsSection />;
      default:
        return null;
    }
  }, [activeTab, filter, form, newSkill, posting, skills]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-12 pt-10 lg:px-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold leading-tight text-slate-50 sm:text-4xl">Internship Portal</h1>
          <p className="text-sm text-slate-300">Switch between flows to manage applicants and postings.</p>
        </header>

        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => {
            const isActive = index === activeTab;
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`rounded-full border px-4 py-2 text-sm transition
                  ${
                    isActive
                      ? "border-cyan-400/70 bg-cyan-500/20 text-cyan-100 shadow-cyan-500/30 shadow-lg"
                      : "border-slate-800 bg-slate-900/80 text-slate-200 hover:border-cyan-400/40 hover:text-cyan-100"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <section className="rounded-3xl border border-slate-800/70 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/80 backdrop-blur">
          {tabContent}
        </section>
      </div>
    </div>
  );
}

function ApplicantFormSection({
  form,
  onChange,
  onSubmit,
  setForm,
}: {
  form: ApplicantForm;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<ApplicantForm>>;
}) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-50">Register New Applicant</h2>
          <p className="text-sm text-slate-300">Fields marked with * are required.</p>
        </div>
        <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-100">
          Draft saved locally
        </span>
      </div>

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="First Name" name="firstName" value={form.firstName} onChange={onChange} placeholder="Jane" required />
        <FormField label="Last Name" name="lastName" value={form.lastName} onChange={onChange} placeholder="Doe" required />
        <FormField label="Email" name="email" type="email" value={form.email} onChange={onChange} placeholder="jane.doe@example.com" required />
        <FormField label="Password" name="password" type="password" value={form.password} onChange={onChange} placeholder="Strong password" required />
        <FormField label="Tel No" name="telNo" value={form.telNo} onChange={onChange} placeholder="+1 (555) 123-4567" />
        <FormField label="Field of Study" name="fieldOfStudy" value={form.fieldOfStudy} onChange={onChange} placeholder="Mechanical Engineering" />
        <FormField label="GPA" name="gpa" type="number" min={0} max={4.3} step="0.01" value={form.gpa} onChange={onChange} placeholder="3.70" />
        <FormField label="Resume URL" name="resumeUrl" type="url" value={form.resumeUrl} onChange={onChange} placeholder="https://..." />
        <FormField label="Expected Graduation Year" name="gradYear" type="number" value={form.gradYear} onChange={onChange} placeholder="2026" />
        <FormField label="Status" name="status" value={form.status} onChange={() => {}} readOnly />
        <FormField label="Age" name="age" type="number" min={16} value={form.age} onChange={onChange} placeholder="21" />

        <div className="md:col-span-2 mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <p className="text-xs text-slate-400">Demo submission only; values are kept locally.</p>
          <div className="flex gap-3">
            <button
              type="button"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500 hover:text-white"
              onClick={() => setForm((prev) => ({ ...prev, firstName: "", lastName: "", email: "" }))}
            >
              Clear names
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-400/40"
            >
              Save Applicant
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function SkillsSection({
  skills,
  newSkill,
  setNewSkill,
  onAdd,
  onRemove,
}: {
  skills: string[];
  newSkill: string;
  setNewSkill: (v: string) => void;
  onAdd: () => void;
  onRemove: (skill: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-50">Manage Applicant Skills</h2>
        <span className="text-xs text-slate-400">Add, tag, and prune skills.</span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill (e.g., TypeScript)"
          className="flex-1 rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />
        <button
          type="button"
          onClick={onAdd}
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-400/40"
        >
          Add Skill
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="group inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => onRemove(skill)}
              className="rounded-full bg-slate-800 px-2 text-xs text-slate-300 group-hover:bg-rose-500/20 group-hover:text-rose-200"
            >
              ×
            </button>
          </span>
        ))}
        {skills.length === 0 && <p className="text-sm text-slate-400">No skills yet.</p>}
      </div>
    </div>
  );
}

function PostingSection({
  posting,
  setPosting,
  onSubmit,
}: {
  posting: { title: string; location: string; type: string; description: string; deadline: string };
  setPosting: React.Dispatch<
    React.SetStateAction<{ title: string; location: string; type: string; description: string; deadline: string }>
  >;
  onSubmit: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-50">Create Internship Posting</h2>
        <span className="text-xs text-slate-400">Draft a role to publish.</span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <input
          value={posting.title}
          onChange={(e) => setPosting((p) => ({ ...p, title: e.target.value }))}
          placeholder="Role title"
          className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />
        <input
          value={posting.location}
          onChange={(e) => setPosting((p) => ({ ...p, location: e.target.value }))}
          placeholder="Location (e.g., Remote, NYC)"
          className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />
        <select
          value={posting.type}
          onChange={(e) => setPosting((p) => ({ ...p, type: e.target.value }))}
          className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        >
          <option>On-site</option>
          <option>Hybrid</option>
          <option>Remote</option>
        </select>
        <input
          type="date"
          value={posting.deadline}
          onChange={(e) => setPosting((p) => ({ ...p, deadline: e.target.value }))}
          className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />
      </div>
      <textarea
        value={posting.description}
        onChange={(e) => setPosting((p) => ({ ...p, description: e.target.value }))}
        placeholder="Describe responsibilities, requirements, and stack."
        rows={4}
        className="w-full rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
      />
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-400 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:shadow-cyan-400/40"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}

function BrowseSection({
  filter,
  setFilter,
  onApply,
}: {
  filter: { keyword: string; location: string; status: string };
  setFilter: React.Dispatch<React.SetStateAction<{ keyword: string; location: string; status: string }>>;
  onApply: (role: string) => void;
}) {
  const roles = [
    { title: "Backend Intern", location: "Remote", status: "Open" },
    { title: "Data Analyst Intern", location: "NYC", status: "Shortlisting" },
    { title: "Frontend Intern", location: "Remote", status: "Open" },
  ].filter((role) => {
    const matchesKeyword = role.title.toLowerCase().includes(filter.keyword.toLowerCase());
    const matchesLocation = filter.location ? role.location.toLowerCase().includes(filter.location.toLowerCase()) : true;
    const matchesStatus = filter.status === "All" ? true : role.status === filter.status;
    return matchesKeyword && matchesLocation && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-50">Browse & Apply</h2>
        <span className="text-xs text-slate-400">Filter open roles and apply.</span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <input
          value={filter.keyword}
          onChange={(e) => setFilter((f) => ({ ...f, keyword: e.target.value }))}
          placeholder="Keyword"
          className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />
        <input
          value={filter.location}
          onChange={(e) => setFilter((f) => ({ ...f, location: e.target.value }))}
          placeholder="Location"
          className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        />
        <select
          value={filter.status}
          onChange={(e) => setFilter((f) => ({ ...f, status: e.target.value }))}
          className="rounded-2xl border border-slate-800 bg-slate-950/70 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
        >
          <option>All</option>
          <option>Open</option>
          <option>Shortlisting</option>
        </select>
      </div>

      <div className="grid gap-3">
        {roles.map((role) => (
          <div key={role.title} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-50">{role.title}</h3>
              <p className="text-sm text-slate-300">{role.location}</p>
              <p className="text-xs text-slate-400">Status: {role.status}</p>
            </div>
            <button
              type="button"
              onClick={() => onApply(role.title)}
              className="rounded-xl border border-cyan-400/50 px-4 py-2 text-sm text-cyan-100 hover:bg-cyan-500/10"
            >
              Apply (demo)
            </button>
          </div>
        ))}
        {roles.length === 0 && <p className="text-sm text-slate-400">No roles match these filters.</p>}
      </div>
    </div>
  );
}

function AnalyticsSection() {
  const cards = [
    { label: "Total Applicants", value: "1,248", note: "↑ 12% vs last week" },
    { label: "Avg. Match Score", value: "87%", note: "Top quartile" },
    { label: "Time to Submit", value: "6m 12s", note: "Fast completion" },
  ];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-50">Applications Analytics</h2>
        <span className="text-xs text-slate-400">Snapshot of the funnel.</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-inner shadow-slate-950/60">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-50">{card.value}</p>
            <p className="text-xs text-slate-400">{card.note}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
        <p className="text-sm text-slate-300">This dashboard is read-only in the demo. Plug in your data source to populate live numbers.</p>
      </div>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  name: keyof ApplicantForm;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  min?: number;
  max?: number;
  step?: string;
  required?: boolean;
  readOnly?: boolean;
};

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
  step,
  required,
  readOnly,
}: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">
        {label}
        {required ? <span className="text-rose-300"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        readOnly={readOnly}
        className={`rounded-2xl border px-3 py-2.5 text-sm text-slate-100 shadow-inner shadow-slate-950/60 outline-none transition
          ${
            readOnly
              ? "cursor-not-allowed border-emerald-500/40 bg-emerald-500/10 text-emerald-100"
              : "border-slate-800 bg-slate-950/70 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/30"
          }`}
      />
    </label>
  );
}
