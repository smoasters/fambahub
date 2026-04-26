import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Tailwind,
  Text,
} from 'react-email';

interface MagicLinkEmailProps {
  url: string;
}

const baseUrl = Bun.env.BETTER_AUTH_URL ?? '';

export const MagicLinkEmail = ({ url }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className='bg-white font-sans'>
        <Preview>Log in with this magic link</Preview>
        <Container className='px-3 mx-auto'>
          <Heading className='text-[#333] text-[24px] my-10 mx-0 p-0'>
            Login to FambaHub
          </Heading>
          <Link
            href={url}
            target='_blank'
            className='text-[#2754C5] text-[14px] underline mb-4 block'
          >
            Click here to log in with this magic link
          </Link>
          <Text className='text-[#ababab] text-[14px] mt-3.5 mb-4'>
            If you didn&apos;t try to login, you can safely ignore this email.
          </Text>
          <Img
            src={`${baseUrl}/favicon.svg`}
            width='32'
            height='32'
            alt="FambaHub's Logo"
          />
          <Text className='text-[#898989] text-[12px] leading-5 mt-3 mb-6'>
            FambaHub — Explore the world.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

MagicLinkEmail.PreviewProps = {
  url: 'https://fambahub.com/auth/magic-link?token=sparo-ndigo-amurt-secan',
};

export default MagicLinkEmail;
