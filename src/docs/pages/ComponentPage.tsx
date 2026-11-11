import { components, type ComponentSpec } from "../registry";
import {
  A11yNote,
  DoDont,
  Page,
  PageHead,
  PropsTable,
  Section,
  Specimen,
  SpecimenGrid,
  Stage,
} from "../ui";

export function ComponentPage({ spec }: { spec: ComponentSpec }) {
  const position = components.findIndex((item) => item.id === spec.id) + 1;
  const sheet = `${String(position).padStart(2, "0")} / ${spec.group.toUpperCase()}`;
  const wide = spec.wide ?? spec.group === "Forms";
  const Demo = spec.Demo;

  return (
    <Page>
      <PageHead
        eyebrow={`Arcana / Components / ${spec.group}`}
        title={spec.name}
        job={spec.job}
        sheet={`Sheet ${String(position).padStart(2, "0")}\n${spec.group} · v1.0`}
      />

      <Section index="01" title="Live demo" note="Interactive">
        <Stage tag={`Specimen ${sheet}`}>
          <Demo />
        </Stage>
      </Section>

      <Section
        index="02"
        title="Variants"
        note={`${spec.variants.length} specimens`}
      >
        <SpecimenGrid wide={spec.wide}>
          {spec.variants.map((item) => (
            <Specimen key={item.label} label={item.label} wide={wide}>
              {item.content}
            </Specimen>
          ))}
        </SpecimenGrid>
      </Section>

      <Section
        index="03"
        title="States"
        note={spec.statesNote ?? "Forced for inspection"}
      >
        <SpecimenGrid wide={spec.wide}>
          {spec.states.map((item) => (
            <Specimen key={item.label} label={item.label} wide={wide}>
              {item.content}
            </Specimen>
          ))}
        </SpecimenGrid>
      </Section>

      <Section index="04" title="Props" note="Native attributes pass through">
        <PropsTable rows={spec.props} caption={`${spec.name} props`} />
      </Section>

      <Section index="05" title="Usage">
        <DoDont dos={spec.dos} donts={spec.donts} />
      </Section>

      <Section index="06" title="Accessibility">
        <A11yNote>{spec.a11y}</A11yNote>
      </Section>
    </Page>
  );
}
