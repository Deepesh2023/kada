import { createSignal } from "solid-js";

export default function AdditionalSaleDataForm() {
  const [additonalSaleDetailsForm, setAdditionalSalesForm] = createSignal({
    customerName: "",
    remarks: "",
    doNotRecord: false,
  });

  return (
    <>
      <form>
        <label for="customer-name">Customer name</label>
        <input
          type="text"
          id="customer-name"
          value={additonalSaleDetailsForm().customerName}
          oninput={(e) =>
            setAdditionalSalesForm({
              ...additonalSaleDetailsForm(),
              customerName: e.target.value,
            })
          }
        />

        <label for="remarks">Remarks</label>
        <textarea
          id="remarks"
          value={additonalSaleDetailsForm().remarks}
          oninput={(e) =>
            setAdditionalSalesForm({
              ...additonalSaleDetailsForm(),
              remarks: e.target.value,
            })
          }
        ></textarea>

        <input
          type="checkbox"
          id="do-not-record"
          checked={additonalSaleDetailsForm().doNotRecord}
          onclick={() =>
            setAdditionalSalesForm({
              ...additonalSaleDetailsForm(),
              doNotRecord: !additonalSaleDetailsForm().doNotRecord,
            })
          }
        />
        <label>Do not include in records</label>
      </form>
    </>
  );
}
