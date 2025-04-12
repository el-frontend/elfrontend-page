import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SendMessageTemplateProps {
  message: string;
}

export const SendMessageTemplate = async ({
  message,
}: SendMessageTemplateProps) => {
  const url = `https://avatars.githubusercontent.com/u/32143683?v=4`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Preview>You have a new message from the ElFrontend Page</Preview>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={url}
                width="120"
                height="120"
                alt="ElFrontend Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Message from <strong>ElFrontend Page</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              {message}
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
