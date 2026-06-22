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
      name: 'badges',
      title: 'Badges',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'badge' }] }],
      description: 'Select one or more badges for this product'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'gender',
      title: 'Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Unisex', value: 'unisex' }
        ],
        layout: 'radio'
      },
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
    },
    {
      name: 'whyThisPiece',
      title: 'Why This Piece',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Unique selling points for this product. Each item appears as a bullet point under "Why This Piece" on the product page.',
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
