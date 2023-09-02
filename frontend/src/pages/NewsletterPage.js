
import ContentComponent from "../components/ContentComponent";
import NewsletterSignup from "../components/NewsletterSignup";

export default function NewsletterPage(){
    return <>
        <ContentComponent title="Signup for Newsletters...">
            <main>
                <NewsletterSignup/>
            </main>
        </ContentComponent>
    </>
};

export const action= async ({request,params})=>{
    const data= await request.formData();
    const email= data.get("email");

    console.log(email);
    return {message: "Signup Successful!"};

}