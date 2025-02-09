import { headers } from 'next/headers'
import os from 'os'

const getSystemIPAddress = () => {
  const interfaces = os.networkInterfaces()

  for (const name of Object.keys(interfaces)) {
    const iface = interfaces[name]
    if (iface) for (const net of iface) if (net.family === 'IPv4' && !net.internal) return net.address
  }

  return '0.0.0.0' // Fallback if no external IPv4 address is found
}

export const getIP = async () => {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const headersList = await headers()
  const forwardedFor = headersList.get('x-forwarded-for')

  let ip = forwardedFor ? forwardedFor.split(',')[0] : headersList.get('x-real-ip') ?? FALLBACK_IP_ADDRESS

  if (ip === '::1') ip = getSystemIPAddress()

  return ip
}
