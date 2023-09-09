const Image = ({ title, src, alt, className }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt={alt}
      title={title}
      className={className}
    />
  )
}

export default Image
