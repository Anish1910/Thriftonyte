export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ],
      validation: Rule => Rule.required().min(1)
    },
    {
      name: 'hoverGif',
      title: 'Hover GIF (optional)',
      type: 'image',
      description: 'Image or GIF that displays on hover. Leave empty to use first product image.',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string',
      options: {
        list: [
          { title: 'Curated', value: 'Curated' },
          { title: 'New', value: 'New' },
          { title: 'Limited', value: 'Limited' },
          { title: 'Rare', value: 'Rare' }
        ]
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold Out', value: 'sold_out' }
        ]
      },
      initialValue: 'available',
      validation: Rule => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      status: 'status'
    },
    prepare(selection) {
      const { status } = selection
      return {
        ...selection,
        subtitle: status ? `[${status.toUpperCase()}]` : 'Draft'
      }
    }
  }
}
