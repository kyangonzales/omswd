import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React from 'react'

export default function Analytics({auth}) {
  return (
    <AuthenticatedLayout user={auth.user}>
        Analytics
    </AuthenticatedLayout>
  )
}
