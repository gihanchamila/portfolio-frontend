import React from 'react'
import Button from './Button'

const MessagesList = ({ contacts = [], onClose }) => (
  <div className="space-y-4">
    {contacts.length === 0 ? (
      <div className="text-center text-gray-500 dark:text-gray-300">No messages found.</div>
    ) : (
      contacts.map((contact, idx) => (
        <div
          key={contact.id || idx}
          className="rounded-lg bg-gray-100 p-4 shadow dark:bg-neutral-800"
        >
          <div className="font-semibold text-gray-800 dark:text-white">{contact.subject}</div>
          <div className="font-semibold text-gray-800 dark:text-white">{contact.name}</div>
          <div className="font-semibold text-gray-800 dark:text-white">{contact.email}</div>
          <div className="text-gray-600 dark:text-gray-300">{contact.message}</div>
          <div className="mt-2 text-xs text-gray-400">{contact.createdAt}</div>
        </div>
      ))
    )}
    <div className="flex justify-end">
      <Button variant="primary" onClick={onClose}>
        Close
      </Button>
    </div>
  </div>
)

export default MessagesList
