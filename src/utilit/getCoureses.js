export const getCourses = async () => {
    try {

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

      
        if (!baseUrl) {
            console.warn("NEXT_PUBLIC_BASE_URL is not defined!");
            return [];
        }

        const res = await fetch(`${baseUrl}/courses.json`, {
            cache: 'no-store' 
        });

        if (!res.ok) {
            console.error(`Fetch failed with status: ${res.status}`);
            return [];
        }

        return await res.json();
    } catch (error) {
        console.error("Course fetch failed during build/runtime:", error);
        return [];
    }
};