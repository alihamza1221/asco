"use client"

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table"
import { ChevronDown, Download, Leaf, SproutIcon, Waves } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"

// Define the offset history data type
type OffsetHistory = {
  id: string
  date: string
  project: string
  projectType: "tree" | "soil" | "water"
  amount: number
  units: string
  cost: number
  impact: number
}

// Sample offset history data
const offsetHistoryData: OffsetHistory[] = [
  {
    id: "OFF-001",
    date: "2023-05-15",
    project: "Plant Trees",
    projectType: "tree",
    amount: 2,
    units: "trees",
    cost: 7.98,
    impact: 40,
  },
  {
    id: "OFF-002",
    date: "2023-04-22",
    project: "Create Soil Area",
    projectType: "soil",
    amount: 5,
    units: "m²",
    cost: 29.95,
    impact: 75,
  },
  {
    id: "OFF-003",
    date: "2023-03-10",
    project: "Plant Trees",
    projectType: "tree",
    amount: 1,
    units: "trees",
    cost: 3.99,
    impact: 20,
  },
  {
    id: "OFF-004",
    date: "2023-02-05",
    project: "Create Soil Area",
    projectType: "soil",
    amount: 2,
    units: "m²",
    cost: 11.98,
    impact: 30,
  },
  {
    id: "OFF-005",
    date: "2023-01-18",
    project: "Plant Trees",
    projectType: "tree",
    amount: 3,
    units: "trees",
    cost: 11.97,
    impact: 60,
  },
]

// Define the columns for the table
const columns: ColumnDef<OffsetHistory>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      const projectType = row.original.projectType
      return (
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-1">
            {projectType === "tree" && <Leaf className="h-4 w-4 text-primary" />}
            {projectType === "soil" && <SproutIcon className="h-4 w-4 text-primary" />}
            {projectType === "water" && <Waves className="h-4 w-4 text-primary" />}
          </div>
          <span>{row.getValue("project")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("amount")} {row.original.units}
        </div>
      )
    },
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("cost"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "impact",
    header: "CO₂ Offset",
    cell: ({ row }) => {
      return <div className="font-medium text-primary">{row.getValue("impact")} kg</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const offset = row.original

      const handleDownloadCertificate = () => {
        toast({
          title: "Certificate Downloaded",
          description: `Certificate for ${offset.project} has been downloaded.`,
        })
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleDownloadCertificate}>
              <Download className="mr-2 h-4 w-4" />
              <span>Download Certificate</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function OffsetHistoryTable() {
  const [sorting, setSorting] = useState<SortingState>([{ id: "date", desc: true }])

  const table = useReactTable({
    data: offsetHistoryData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No offset history found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
