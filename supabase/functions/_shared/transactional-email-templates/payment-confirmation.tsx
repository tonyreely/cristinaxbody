/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "xBody by Criss"

interface PaymentConfirmationProps {
  firstName?: string
  email?: string
}

const PaymentConfirmationEmail = ({ firstName, email }: PaymentConfirmationProps) => (
  <Html lang="ro" dir="ltr">
    <Head />
    <Preview>Plata ta a fost confirmată – {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Heading style={logo}>{SITE_NAME}</Heading>
        </Section>

        <Hr style={divider} />

        <Heading style={h1}>
          {firstName ? `Mulțumim, ${firstName}!` : 'Mulțumim!'}
        </Heading>

        <Text style={text}>
          Plata ta a fost confirmată cu succes. Locul tău este acum securizat! 🎉
        </Text>

        <Section style={highlightBox}>
          <Text style={highlightText}>
            Vei fi contactat(ă) în maximum <strong>72 de ore</strong> de echipa {SITE_NAME} pentru a stabili detaliile programării tale.
          </Text>
        </Section>

        <Text style={text}>
          Dacă ai întrebări sau ai nevoie de informații suplimentare, ne poți contacta direct:
        </Text>

        <Section style={contactBox}>
          <Text style={contactText}>
            📞 <Link href="tel:+40749577746" style={phoneLink}>+40 749 577 746</Link>
          </Text>
        </Section>

        <Hr style={divider} />

        <Text style={footer}>
          Cu drag,<br />
          Echipa {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: PaymentConfirmationEmail,
  subject: 'Plata ta a fost confirmată – xBody by Criss',
  displayName: 'Confirmare plată',
  previewData: { firstName: 'Maria', email: 'maria@example.com' },
} satisfies TemplateEntry

// Styles — gold + dark luxury brand
const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
}

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '40px 24px',
}

const headerSection = {
  textAlign: 'center' as const,
  paddingBottom: '8px',
}

const logo = {
  fontSize: '28px',
  fontWeight: '700' as const,
  color: '#b8860b',
  margin: '0',
  textAlign: 'center' as const,
}

const divider = {
  borderColor: '#e8dcc8',
  margin: '24px 0',
}

const h1 = {
  fontSize: '24px',
  fontWeight: '700' as const,
  color: '#1a1a1a',
  margin: '0 0 16px',
}

const text = {
  fontSize: '15px',
  color: '#444444',
  lineHeight: '1.6',
  margin: '0 0 20px',
}

const highlightBox = {
  backgroundColor: '#fdf8ef',
  border: '1px solid #e8dcc8',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '0 0 24px',
}

const highlightText = {
  fontSize: '15px',
  color: '#333333',
  lineHeight: '1.6',
  margin: '0',
}

const contactBox = {
  textAlign: 'center' as const,
  margin: '0 0 24px',
}

const contactText = {
  fontSize: '18px',
  color: '#1a1a1a',
  fontWeight: '600' as const,
  margin: '0',
}

const phoneLink = {
  color: '#b8860b',
  textDecoration: 'none',
}

const footer = {
  fontSize: '13px',
  color: '#999999',
  lineHeight: '1.5',
  margin: '0',
}
