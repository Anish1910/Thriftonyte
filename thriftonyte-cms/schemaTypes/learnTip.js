export default {
  name: 'learnTip',
  title: 'Learn Tip',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Style Better', value: 'style' },
          { title: 'Care Better', value: 'care' },
          { title: 'Think Better', value: 'think' },
          { title: 'Thrift Hacks', value: 'hacks' }
        ]
      }
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
    },
    {
      name: 'short',
      title: 'Short Description',
      type: 'string',
    },
    {
      name: 'tips',
      title: 'Tips',
      type: 'array',
      of: [{ type: 'string' }]
    }
  ]
}