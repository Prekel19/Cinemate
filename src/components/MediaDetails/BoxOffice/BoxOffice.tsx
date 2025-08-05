import { Container } from "@/components/ui/Container/Container";
import { getFormatedSum } from "@/utility/getFormatedSum";
import { DollarSign } from "lucide-react";
import "./style.scss";

type BoxOfficeProps = {
  budget: number;
  revenue: number;
};

export const BoxOffice = ({ budget, revenue }: BoxOfficeProps) => {
  return (
    <div className="box-office">
      <h3 className="box-office_title">Box Office</h3>
      <div className="box-office_content">
        <Container className="box-office_item">
          <div className="box-office_item-title">
            <DollarSign size={20} color="#22c55e" />
            <p>Budget</p>
          </div>
          <p className="box-office_item-content">
            {budget ? getFormatedSum(budget) : "-"}
          </p>
        </Container>
        <Container className="box-office_item">
          <div className="box-office_item-title">
            <DollarSign size={20} color="#22c55e" />
            <p>Revenue</p>
          </div>
          <p className="box-office_item-content">
            {revenue ? getFormatedSum(revenue) : "-"}
          </p>
        </Container>
      </div>
    </div>
  );
};
