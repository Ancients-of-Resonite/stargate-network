import type { ColumnDef } from '@tanstack/vue-table';
import type { User } from 'database/prisma/generated/prisma/client';
import { h } from 'vue';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-right' }, 'Email'),
    cell: ({ row }) => h('div', { class: 'text-right font-medium' }, row.getValue('email'))
  },
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => h('div', { class: 'text-right font-medium' }, row.getValue('name')),
  }
]

