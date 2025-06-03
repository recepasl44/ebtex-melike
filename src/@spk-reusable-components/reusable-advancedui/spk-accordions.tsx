import React, { useState, Fragment, useEffect } from "react";
import { Accordion } from "react-bootstrap";

interface AccordionItem {
  footer: React.JSX.Element;
  id: string;
  title: string;
  content: React.ReactNode;
  itemClass: any;
  bodyClass: string;
  onClick?: () => void;
}

interface SpkAccordionsProps {
  items?: AccordionItem[] | any;
  defaultActiveKey?: string;
  flush?: boolean;
  accordionClass?: string;
  Open?: boolean;
  closeAll?: boolean;
  footer?: boolean;
  onActiveKeyChange?: (key: string | null) => void;
}

const SpkAccordions: React.FC<SpkAccordionsProps> = ({
  items,
  defaultActiveKey,
  flush = false,
  accordionClass,
  closeAll = false,
  Open,
  onActiveKeyChange,
}) => {
  const [activeKey, setActiveKey] = useState<string | null>(
    closeAll
      ? null
      : defaultActiveKey || (items.length > 0 ? items[0].id : null)
  );

  // ActiveKey değiştiğinde dış bileşene bildir
  useEffect(() => {
    if (onActiveKeyChange) {
      onActiveKeyChange(activeKey);
    }
  }, [activeKey, onActiveKeyChange]);

  // onSelect olayını güncelle
  const handleSelect = (key: string | null) => {
    setActiveKey(key);

    // Eğer seçilen öğenin onClick fonksiyonu varsa çağır
    if (key && items) {
      const selectedItem = items.find((item: AccordionItem) => item.id === key);
      if (selectedItem && selectedItem.onClick) {
        selectedItem.onClick();
      }
    }
  };

  return (
    <Fragment>
      <Accordion
        className={accordionClass}
        activeKey={activeKey}
        flush={flush}
        onSelect={(k: any) => handleSelect(k)}
        alwaysOpen={Open}
      >
        {items.map((item: AccordionItem, index: number) => (
          <Accordion.Item
            eventKey={item.id}
            className={item.itemClass}
            key={item.id || `${item.title}-${index}`}
          >
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body className={item.bodyClass}>
              {item.content}
            </Accordion.Body>

            {item.footer && (
              <div className="accordion-footer">{item.footer}</div>
            )}
          </Accordion.Item>
        ))}
      </Accordion>
    </Fragment>
  );
};

export default SpkAccordions;
