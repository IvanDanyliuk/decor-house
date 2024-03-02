import PromotionsView from "@/components/promotions/PromotionsView";


const Promotions = () => {
  return (
    <div className='relative w-full'>
      <section className='py-8 w-full bg-main-bg'>
        <h2 className='container mx-auto page-heading-primary text-center'>
          Promotions
        </h2>
      </section>
      <section>
        <PromotionsView />
      </section>
    </div>
  );
};

export default Promotions;