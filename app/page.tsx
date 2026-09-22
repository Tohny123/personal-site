// import Image from 'next/image'
// import Link from 'next/link'
import { Button } from '../components/ui/button'

export default function Home() {
  return (
    <div className='flex flex-col flex-1 items-center justify-center font-sans '>
      <main className='flex flex-1 w-full max-w-7xl flex-col items-center justify-between py-16 px-16 sm:items-start'>
        <h1 className='primary_header'>asdf</h1>
        <h1> H1 Header </h1>
        <h2> H2 Header </h2>
        <h3> H3 Header </h3>
        <p> This is a paragraph. </p>
        <Button showLabel={false} text='go to blog' href='/blog' />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis urna nisi, in ultrices augue dictum ac. Quisque a ultricies tortor. Vestibulum volutpat nisi vehicula neque faucibus, sed imperdiet arcu laoreet. Donec arcu felis, malesuada sed aliquam vel, congue eu eros. Vestibulum condimentum justo non tellus sollicitudin porta. Nam ante mauris, posuere id sapien bibendum, fermentum consectetur sem. Maecenas tincidunt justo sit amet metus venenatis accumsan.
          Donec congue vehicula volutpat. Proin molestie lacus ac mauris sodales consequat. Nullam fermentum id quam nec bibendum. Aliquam id urna at enim bibendum eleifend. Integer varius in lacus non interdum. Nulla nec pulvinar elit, ut ultricies tellus. Aliquam sodales varius sem, ornare porttitor dolor. Nunc dapibus, libero ut tincidunt lobortis, leo magna volutpat arcu, non finibus elit magna a sapien.
          Sed lacus tellus, cursus in nisl vel, eleifend mollis sapien. Fusce ullamcorper turpis at odio rutrum volutpat. Duis rutrum mollis neque non laoreet. Donec viverra non velit sed molestie. Morbi condimentum elementum turpis non finibus. Suspendisse dapibus nisl consequat metus auctor, ut fermentum arcu tempor. Curabitur consectetur ex et lectus luctus, id tincidunt eros hendrerit. Etiam pharetra, ligula sed dictum dapibus, tortor libero rutrum neque, ullamcorper imperdiet erat mauris vitae nisl. In sed orci eu velit tincidunt fringilla. Suspendisse risus urna, congue at gravida ut, venenatis at neque.
          Sed ac nisi sit amet erat sollicitudin condimentum sed sed nisi. Vivamus faucibus orci purus, et scelerisque ex porta accumsan. Aliquam non dui neque. Vivamus quis porta tellus. In hac habitasse platea dictumst. In vel ullamcorper risus. Cras diam erat, gravida eget ullamcorper ut, imperdiet eu turpis. Vestibulum pulvinar metus vel tempus iaculis. Ut bibendum at mauris sed congue. Proin auctor quam in quam fermentum mattis. Sed scelerisque porta turpis vitae sodales. Donec dictum posuere nulla quis mattis. Vestibulum gravida quam ac dui laoreet gravida. Donec non risus dictum, laoreet lacus id, dapibus enim.
          Morbi dapibus quam et risus pretium, et pulvinar justo feugiat. Sed sollicitudin justo volutpat tincidunt ornare. Mauris in mauris et justo placerat ultrices vel non magna. Sed et tellus et tortor malesuada lobortis eget vitae nisl. Suspendisse bibendum, purus et sollicitudin dignissim, nisl nisi sodales velit, quis iaculis nulla sapien sit amet velit. Aenean sit amet luctus ipsum, id sodales massa. Ut convallis massa et commodo maximus. Sed semper massa nec aliquet sodales. Suspendisse leo ante, ullamcorper nec felis non, sagittis mattis enim. Fusce nec bibendum ligula, quis commodo arcu.
        </p>

      </main>
    </div>
  )
}
