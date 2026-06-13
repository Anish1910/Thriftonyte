export default {
  name: 'shopSettings',
  title: 'Shop Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Shop Title',
      type: 'string',
      description: 'The main heading for the Shop page'
    },
    {
      name: 'subtitle',
      title: 'Shop Subtitle',
      type: 'string',
      description: 'The sub-heading for the Shop page'
    },
    {
      name: 'backgroundImage',
      title: 'Background Image / GIF',
      type: 'image',
      description: 'Upload an image or GIF to use as the background. If both image and video are uploaded, video will take priority.',
      options: {
        hotspot: true
      }
    },
    {
      name: 'backgroundVideo',
      title: 'Background Video',
      type: 'file',
      description: 'Upload a video file (.mp4, .webm) to use as the background.'
    }
  ]
}
