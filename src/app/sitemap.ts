import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://elfrontend.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
      images: ['https://elfrontend.com/og.webp']
    },
    {
      url: 'https://elfrontend.com/blog',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  ]
}