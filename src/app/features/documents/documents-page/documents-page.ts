import { Component, computed, signal } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideFileText,
  lucideUpload,
  lucideSearch,
  lucideFilter,
  lucideDownload,
  lucideTrash2,
  lucideEye,
  lucideFolderOpen,
  lucideFile,
  lucideFileSpreadsheet,
  lucideFileImage,
  lucideMoreHorizontal,
  lucideCalendar,
  lucideHardDrive,
} from '@ng-icons/lucide';

interface Document {
  id: string;
  name: string;
  type: "pdf" | "xlsx" | "png" | "jpg" | "doc";
  size: string;
  uploadedAt: Date;
  category: "statements" | "receipts" | "tax" | "contracts" | "other";
}

const DOCUMENTS: Document[] = [
  { id: "1", name: "BBVA_Statement_March_2026.pdf", type: "pdf", size: "245 KB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), category: "statements" },
  { id: "2", name: "Tax_Declaration_2025.pdf", type: "pdf", size: "1.2 MB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), category: "tax" },
  { id: "3", name: "Rent_Contract_2026.pdf", type: "pdf", size: "890 KB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), category: "contracts" },
  { id: "4", name: "Budget_Spreadsheet.xlsx", type: "xlsx", size: "156 KB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), category: "other" },
  { id: "5", name: "Receipt_Walmart_040826.jpg", type: "jpg", size: "1.8 MB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), category: "receipts" },
  { id: "6", name: "AMEX_Statement_Feb_2026.pdf", type: "pdf", size: "312 KB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 35), category: "statements" },
  { id: "7", name: "Investment_Report_Q1.pdf", type: "pdf", size: "2.1 MB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), category: "statements" },
  { id: "8", name: "Insurance_Policy.pdf", type: "pdf", size: "567 KB", uploadedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60), category: "contracts" },
];

const CATEGORIES = [
  { id: "all", label: "All Documents" },
  { id: "statements", label: "Statements" },
  { id: "receipts", label: "Receipts" },
  { id: "tax", label: "Tax Documents" },
  { id: "contracts", label: "Contracts" },
  { id: "other", label: "Other" },
];

@Component({
  selector: 'app-documents-page',
  imports: [NgClass, NgIcon, DatePipe, FormsModule],
  templateUrl: './documents-page.html',
  styleUrl: './documents-page.css',
  providers: [
    provideIcons({
      lucideFileText,
      lucideUpload,
      lucideSearch,
      lucideFilter,
      lucideDownload,
      lucideTrash2,
      lucideEye,
      lucideFolderOpen,
      lucideFile,
      lucideFileSpreadsheet,
      lucideFileImage,
      lucideMoreHorizontal,
      lucideCalendar,
      lucideHardDrive,
    })
  ]
})
export class DocumentsPage {
  readonly documents = DOCUMENTS;
  readonly categories = CATEGORIES;
  readonly Math = Math;

  searchQuery = signal("");
  selectedCategory = signal("all");

  readonly typeIcons: Record<string, string> = {
    pdf: 'lucideFileText',
    xlsx: 'lucideFileSpreadsheet',
    png: 'lucideFileImage',
    jpg: 'lucideFileImage',
    doc: 'lucideFile',
  };

  readonly typeColors: Record<string, string> = {
    pdf: "text-destructive bg-destructive/10",
    xlsx: "text-chart-1 bg-chart-1/10",
    png: "text-chart-2 bg-chart-2/10",
    jpg: "text-chart-2 bg-chart-2/10",
    doc: "text-primary bg-primary/10",
  };

  filteredDocuments = computed(() => {
    const q = this.searchQuery().toLowerCase();
    const cat = this.selectedCategory();

    return this.documents.filter(doc => {
      const matchesSearch = doc.name.toLowerCase().includes(q);
      const matchesCategory = cat === "all" || doc.category === cat;
      return matchesSearch && matchesCategory;
    });
  });

  totalSize = computed(() => {
    return this.documents.reduce((sum, doc) => {
      const size = parseFloat(doc.size);
      const unit = doc.size.includes("MB") ? 1024 : 1;
      return sum + size * unit;
    }, 0);
  });
}
