type Props = {
  children: React.ReactNode
}
const Section = ({ children }: Props) => {
  return (
    <section className="px-4 max-w-4xl mx-auto grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-4 pt-[56px] mb-4 ">
      {children}
    </section>
  )
}

export default Section
