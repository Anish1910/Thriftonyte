export default {
  name: 'badge',
  title: 'Badge',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    {
      name: 'name',
      title: 'Badge Name',
      type: 'string',
      description: 'e.g. Curated, New, Limited, Rare',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'One short line explaining what this badge means.',
      validation: Rule => Rule.required().max(150)
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
      initialValue: 0
    }
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description'
    }
  }
}
