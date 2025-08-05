// Function to fetch and display GitHub releases
async function getReleases() {
    const repo = 'weberq/Pranay-Funds'; // Your GitHub repository
    const releaseList = document.getElementById('release-list');

    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/releases`);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`GitHub API returned a ${response.status} error.`);
        }

        const releases = await response.json();
        
        // Clear the loading message
        releaseList.innerHTML = '';

        if (releases.length === 0) {
            releaseList.innerHTML = '<div class="col-12 text-center"><p class="lead text-on-surface-variant">No releases found.</p></div>';
            return;
        }

        releases.forEach(release => {
            // Find the .apk asset
            const apkAsset = release.assets.find(asset => asset.name.endsWith('.apk'));
            if (!apkAsset) return; // Skip if no APK file is found

            // Format the release date
            const releaseDate = new Date(release.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Create the release card HTML
            const releaseCard = document.createElement('div');
            releaseCard.className = 'col-lg-8 wow fadeInUp';
            
            // Use regex to format the changelog from the release body
            const changelogHtml = release.body.replace(/\r\n/g, '<br>').replace(/### (.*?)\<br\>/g, '<h6>$1</h6><ul>').replace(/\* (.*?)\<br\>/g, '<li>$1</li>').replace(/<\/ul\>(?![\s\S]*<\/ul>)/, '</ul>');


            releaseCard.innerHTML = `
                <div class="release-card-m3">
                    <div class="d-flex w-100 justify-content-between align-items-center mb-2">
                        <h4 class="mb-1">${release.name || release.tag_name}</h4>
                        <span class="badge bg-primary-m3 rounded-pill">${release.prerelease ? 'Pre-release' : 'Latest'}</span>
                    </div>
                    <small class="text-on-surface-variant d-block mb-3">Published on ${releaseDate}</small>
                    
                    <div class="changelog">
                        ${changelogHtml || '<p>No description provided.</p>'}
                    </div>

                    <a href="${apkAsset.browser_download_url}" class="btn btn-secondary-m3 rounded-pill px-4 mt-4">
                        <i class="fa fa-download me-2"></i>Download APK (${(apkAsset.size / 1024 / 1024).toFixed(2)} MB)
                    </a>
                </div>
            `;
            
            releaseList.appendChild(releaseCard);
        });

    } catch (error) {
        console.error('Failed to fetch releases:', error);
        releaseList.innerHTML = `<div class="col-12 text-center"><p class="lead text-danger">Could not load releases. Please try again later.</p><p>${error.message}</p></div>`;
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', getReleases);