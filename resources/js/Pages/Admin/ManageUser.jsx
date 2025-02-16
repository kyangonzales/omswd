import TopNav from '@/Components/TopNav'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

export default function ManageUser({auth}) {
  return (
    <AuthenticatedLayout user={auth.user}>
       
    </AuthenticatedLayout>
  )
}
