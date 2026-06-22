export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '📄',
  fields: [
    {
      name: 'badgeSectionTitle',
      title: 'Badge Section Title',
      type: 'string',
      description: 'Heading for the badge definitions section.',
      initialValue: 'Our Badges'
    },
    {
      name: 'badgeSectionSubtitle',
      title: 'Badge Section Subtitle',
      type: 'string',
      description: 'Short description below the heading.',
      initialValue: 'Every badge means something. Here\'s what they stand for.'
    },
    {
      name: 'badges',
      title: 'Badges to Display',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'badge' }] }],
      description: 'Select which badges to show on the About page, in order.'
    }
  ],
  preview: {
    prepare() {
      return { title: 'About Page Settings' }
    }
  }
}
