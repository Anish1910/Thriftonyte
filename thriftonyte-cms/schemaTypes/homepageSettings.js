export default {
  name: 'homepageSettings',
  title: 'Homepage Settings',
  type: 'document',
  fields: [
    {
      name: 'heroImages',
      title: 'Hero Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    },
    {
      name: 'heroText',
      title: 'Hero Text',
      type: 'string',
      description: 'Main headline for hero section'
    },
    {
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }]
        }
      ]
    },
    {
      name: 'featuredCategories',
      title: 'Featured Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ]
    }
  ]
}
