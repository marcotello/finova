"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  FolderOpen,
  File,
  FileSpreadsheet,
  FileImage,
  MoreHorizontal,
  Calendar,
  HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "xlsx" | "png" | "jpg" | "doc";
  size: string;
  uploadedAt: Date;
  category: "statements" | "receipts" | "tax" | "contracts" | "other";
}

const documents: Document[] = [
  {
    id: "1",
    name: "BBVA_Statement_March_2026.pdf",
    type: "pdf",
    size: "245 KB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    category: "statements",
  },
  {
    id: "2",
    name: "Tax_Declaration_2025.pdf",
    type: "pdf",
    size: "1.2 MB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    category: "tax",
  },
  {
    id: "3",
    name: "Rent_Contract_2026.pdf",
    type: "pdf",
    size: "890 KB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    category: "contracts",
  },
  {
    id: "4",
    name: "Budget_Spreadsheet.xlsx",
    type: "xlsx",
    size: "156 KB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    category: "other",
  },
  {
    id: "5",
    name: "Receipt_Walmart_040826.jpg",
    type: "jpg",
    size: "1.8 MB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    category: "receipts",
  },
  {
    id: "6",
    name: "AMEX_Statement_Feb_2026.pdf",
    type: "pdf",
    size: "312 KB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35),
    category: "statements",
  },
  {
    id: "7",
    name: "Investment_Report_Q1.pdf",
    type: "pdf",
    size: "2.1 MB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    category: "statements",
  },
  {
    id: "8",
    name: "Insurance_Policy.pdf",
    type: "pdf",
    size: "567 KB",
    uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
    category: "contracts",
  },
];

const typeIcons = {
  pdf: FileText,
  xlsx: FileSpreadsheet,
  png: FileImage,
  jpg: FileImage,
  doc: File,
};

const typeColors = {
  pdf: "text-destructive bg-destructive/10",
  xlsx: "text-chart-1 bg-chart-1/10",
  png: "text-chart-2 bg-chart-2/10",
  jpg: "text-chart-2 bg-chart-2/10",
  doc: "text-primary bg-primary/10",
};

const categories = [
  { id: "all", label: "All Documents" },
  { id: "statements", label: "Statements" },
  { id: "receipts", label: "Receipts" },
  { id: "tax", label: "Tax Documents" },
  { id: "contracts", label: "Contracts" },
  { id: "other", label: "Other" },
];

function formatDate(date: Date) {
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSize = documents.reduce((sum, doc) => {
    const size = parseFloat(doc.size);
    const unit = doc.size.includes("MB") ? 1024 : 1;
    return sum + size * unit;
  }, 0);

  return (
    <div className="p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground">
            Store and organize your financial documents
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Upload className="h-4 w-4" />
          Upload Document
        </button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Total Documents</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-card-foreground">
            {documents.length}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <HardDrive className="h-5 w-5 text-chart-1" />
            <p className="text-sm text-muted-foreground">Storage Used</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-card-foreground">
            {(totalSize / 1024).toFixed(1)} MB
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-chart-2" />
            <p className="text-sm text-muted-foreground">Last Upload</p>
          </div>
          <p className="mt-2 text-2xl font-bold text-card-foreground">Today</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium text-card-foreground">
            No documents found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredDocuments.map((doc) => {
            const Icon = typeIcons[doc.type];
            return (
              <div
                key={doc.id}
                className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-lg",
                      typeColors[doc.type]
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <button className="rounded-md p-1 opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
                <div className="mt-3">
                  <p className="truncate font-medium text-card-foreground">
                    {doc.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{formatDate(doc.uploadedAt)}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-1.5 text-xs font-medium text-card-foreground transition-colors hover:bg-muted">
                    <Eye className="h-3.5 w-3.5" />
                    View
                  </button>
                  <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-1.5 text-xs font-medium text-card-foreground transition-colors hover:bg-muted">
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button className="flex items-center justify-center rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
