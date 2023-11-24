'use client'

export default function ErrorWrapper({ error }: { error: Error }) {
  return <h2 className="error msg">Oops!!!! {error.message}</h2>
}