export default {
  name: 'banner',
  title: 'Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Banner Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string'
    },
    {
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'e.g., /shop or /about'
    },
    {
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Only active banners will be displayed'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      active: 'active'
    },
    prepare(selection) {
      const { active } = selection
      return {
        ...selection,
        subtitle: active ? 'Active' : 'Inactive'
      }
    }
  }
}
