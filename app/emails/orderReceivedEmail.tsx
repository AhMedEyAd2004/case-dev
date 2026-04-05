import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Font,
  Img,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

// ====================================================================
// When integrating with other services, you need to convert your React template
// into HTML before sending. Resend takes care of that for you.
// npx email dev --dir app/emails, to preview email
// the installation u need for email is @react-email/components
// react-email and @react-email/preview-server is for showing the email in dev only
// ====================================================================

type ShippingAddress = {
  name: string;
  address: string;
  city: string;
  country: string;
  createdAt: string;
};

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://case-cobradev.vercel.app";

export default function OrderReceivedEmail({
  shippingAddress,
  orderId = "347bgiuv34r3k5",
}: {
  shippingAddress: ShippingAddress;
  orderId: string;
}) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="DM Serif Display"
          fallbackFontFamily="Georgia"
          webFont={{
            url: "https://fonts.gstatic.com/s/dmserifdisplay/v16/-nFnOHM81r4j6k0gjALR8uVHf0nQoa0.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="DM Sans"
          fallbackFontFamily="Helvetica"
          webFont={{
            url: "https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZOIHQ.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Order #{orderId} confirmed — it&apos;s on its way to you.</Preview>

      <Tailwind>
        <Body className="m-0 bg-green-50 p-0 font-sans">
          {/* ── Top accent bar ── */}
          <Section className="h-1 w-full bg-green-700" />

          <Container className="mx-auto my-8 max-w-150">
            {/* ── Logo / Brand ── */}
            <Section className="bg-white px-10 pt-10 pb-6 text-center">
              {/* Replace src with your actual icon URL e.g. https://yourdomain.com/icon.png */}
              <Img
                src={`${baseUrl}/snake-3.png`}
                width={70}
                height={80}
                alt="Store Logo"
                className="mx-auto mb-3"
              />
              <Text className="m-0 text-center font-serif text-2xl tracking-[0.2em] text-green-700">
                ✦ CaseCobra
              </Text>
            </Section>

            {/* ── Hero ── */}
            <Section className="bg-green-700 px-10 py-12">
              <Text className="m-0 mb-4 font-sans text-xs tracking-[0.3em] text-green-300 uppercase">
                Order Confirmed
              </Text>
              <Heading className="m-0 mb-5 font-serif text-[38px] leading-tight font-normal text-white">
                Thank you for
                <br />
                your order.
              </Heading>
              <Text className="m-0 text-sm leading-relaxed text-green-200">
                We&apos;ve received your request and are preparing everything with care. You&apos;ll
                receive a shipping notification as soon as your package is on its way.
              </Text>
            </Section>

            {/* ── Order ID ── */}
            <Section className="border-b border-green-100 bg-white px-10 py-6">
              <Row>
                <Column>
                  <Text className="m-0 mb-1 text-xs tracking-[0.2em] text-gray-400 uppercase">
                    Order Number
                  </Text>
                  <Text className="m-0 text-base font-semibold text-green-700">#{orderId}</Text>
                </Column>
                <Column align="right">
                  <Text className="m-0 mb-1 text-xs tracking-[0.2em] text-gray-400 uppercase">
                    Date
                  </Text>
                  <Text className="m-0 text-base font-semibold text-green-700">
                    {shippingAddress.createdAt}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* ── Shipping Address ── */}
            <Section className="bg-white px-10 py-8">
              <Text className="m-0 mb-4 text-xs font-semibold tracking-[0.25em] text-green-600 uppercase">
                Shipping To
              </Text>

              <Text className="m-0 mb-1 text-[15px] font-semibold text-gray-800">
                {shippingAddress.name}
              </Text>

              <Text className="m-0 text-sm leading-6 text-gray-500">
                {shippingAddress.address}
                <br />
                {shippingAddress.city}
                <br />
                {shippingAddress.country}
              </Text>
            </Section>

            <Hr className="mx-10 my-0 border-green-100" />

            {/* ── What's next ── */}
            <Section className="bg-white px-10 py-8">
              <Text className="m-0 mb-6 text-xs font-semibold tracking-[0.25em] text-green-600 uppercase">
                What Happens Next
              </Text>

              <Row className="mb-5">
                <Column className="w-8">
                  <Text className="m-0 font-serif text-lg text-green-500">01</Text>
                </Column>
                <Column>
                  <Text className="m-0 mb-1 text-sm font-semibold text-gray-800">
                    Order Processing
                  </Text>
                  <Text className="m-0 text-sm leading-snug text-gray-500">
                    Our team is picking and packing your items right now.
                  </Text>
                </Column>
              </Row>

              <Row className="mb-5">
                <Column className="w-8">
                  <Text className="m-0 font-serif text-lg text-green-500">02</Text>
                </Column>
                <Column>
                  <Text className="m-0 mb-1 text-sm font-semibold text-gray-800">
                    Shipping Notification
                  </Text>
                  <Text className="m-0 text-sm leading-snug text-gray-500">
                    You&apos;ll receive a tracking link via email once dispatched.
                  </Text>
                </Column>
              </Row>

              <Row>
                <Column className="w-8">
                  <Text className="m-0 font-serif text-lg text-green-500">03</Text>
                </Column>
                <Column>
                  <Text className="m-0 mb-1 text-sm font-semibold text-gray-800">Delivery</Text>
                  <Text className="m-0 text-sm leading-snug text-gray-500">
                    Your order arrives at your doorstep — enjoy!
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* ── CTA ── */}
            <Section className="bg-green-600 px-10 py-8 text-center">
              <Text className="m-0 mb-4 text-sm text-green-100">Questions about your order?</Text>
              <Text className="m-0">
                <a
                  href="mailto:support@store.com"
                  className="text-sm font-semibold tracking-widest text-white uppercase no-underline"
                >
                  Contact Support →
                </a>
              </Text>
            </Section>

            {/* ── Footer ── */}
            <Section className="px-10 py-6 text-center">
              <Text className="m-0 mb-1 text-xs tracking-wide text-gray-400">
                ✦ CaseCobra · 123 Commerce St, New York, NY 10001
              </Text>
              <Text className="m-0 text-xs text-gray-400">
                <a href="#" className="text-gray-400 underline">
                  Unsubscribe
                </a>
                {" · "}
                <a href="#" className="text-gray-400 underline">
                  Privacy Policy
                </a>
              </Text>
            </Section>
          </Container>

          {/* ── Bottom accent bar ── */}
          <Section className="h-1 w-full bg-green-500" />
        </Body>
      </Tailwind>
    </Html>
  );
}
